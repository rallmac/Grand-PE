export default function RegistrationForm() {
	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
    		<div className="sm:mx-auto sm:w-full sm:max-w-sm">
    			<img src="./assets/images/GRAND_PE_GLOBAL.png" alt="Grand-PE Logo" className="mx-auto h-10 w-auto" />
    			<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create an account to get started</h2>
  			</div>

  			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    			<form action="#" method="POST" className="space-y-6">
  					<div>
        				<label for="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
        					<div class="mt-2">
          						<input id="email" type="email" name="email" required autocomplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        					</div>
      				</div>

      				<div>
        				<button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Register</button>
      				</div>
    			</form>

    			<p class="mt-10 text-center text-sm/6 text-gray-400">
      				By Registration, you agree to terms and conditions
      				// eslint-disable-next-line
      				<a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">View terms and conditions</a>
    			</p>
  			</div>
		</div>
	)
}