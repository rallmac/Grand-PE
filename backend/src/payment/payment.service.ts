import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private cfg: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
    const stripeKey = this.cfg.get<string>('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');
    this.stripe = new Stripe(stripeKey, { apiVersion: '2025-08-27.basil' });
  }

  async createCheckoutSession(userId: string, amountUsd: number) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'App Points' },
            unit_amount: Math.round(amountUsd * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.cfg.get('FRONTEND_BASE_URL')}/dashboard?success=true`,
      cancel_url: `${this.cfg.get('FRONTEND_BASE_URL')}/dashboard?canceled=true`,
      metadata: { userId },
    });
    return { url: session.url };
  }

  async handleWebhook(event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const amountUsd = session.amount_total ? session.amount_total / 100 : 0;
      if (!userId || !amountUsd) return;
      const points = amountUsd * 200;
      await this.userModel.findByIdAndUpdate(userId, { $inc: { points } });
    }
  }
}
