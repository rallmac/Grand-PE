import { Controller, Post, Body, Req, Headers } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request } from 'express';
import Stripe from 'stripe';

@Controller('payment')
export class PaymentController {
  constructor(private payment: PaymentService) {}

  @Post('checkout')
  async createCheckout(@Body('amount') amount: number, @Body('userId') userId: string) {
    return this.payment.createCheckoutSession(userId, amount);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    const stripe = this.payment['stripe'];
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      return { error: 'Webhook Error' };
    }
    await this.payment.handleWebhook(event);
    return { received: true };
  }
}
