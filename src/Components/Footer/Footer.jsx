import mastercard from '../../assets/images/mastercard.webp'
import amazon from '../../assets/images/amazon-pay.png'
import paypal from '../../assets/images/paypal.png'
import american from '../../assets/images/American-Express-Color.png'
import apple from '../../assets/images/get-apple-store.png'
import google from '../../assets/images/get-google-play.png'
import visa from '../../assets/images/visa.svg'

export default function Footer() {
  return (
<>
    <footer className='bg-slate-100 py-8 px-3'>
        <div className="container space-y-4">
            <div className="header-footer">
            <h2 className='text-xl font-semibold text-slate-800'>Get The ShopNow App</h2>
            <p className='text-slate-400'>We will send you a link, open it on your phone to download the app.</p>
            </div>
            <div className="body-footer md:flex-row flex flex-col gap-2">
                <input className='form-control grow' type='email' id='email' name='email' placeholder='Email Address'/>
                <button className='btn uppercase bg-primary-500 hover:bg-primary-700 text-white font-bold' type='submit'>share App Link</button>
            </div>
            <div className="footer  py-3 border-y-2 border-opacity-50 border-gray-300 lg:flex-row flex flex-col items-center justify-between ">
                <div className="payment lg:flex-row flex flex-col gap-3 items-center">
                    <h3 className='font-semibold'>Payment Partners</h3>
                    <img className='w-20' src={amazon} alt="Logo Amazon" />
                    <img className='w-16' src={american} alt="logo american-card" />
                    <img className='w-14' src={mastercard} alt="logo mastercard" />
                    <img className='w-16' src={paypal} alt="logo paypal" />
                    <img className='w-16' src={visa} alt="logo visa" />
                </div>
                <hr/>
                <div className="download lg:flex-row flex flex-col items-center gap-3 ">
                    <h3 className='font-semibold'>Get deliveries with ShopNow
                    </h3>
                    <div className="img-footer flex flex-row ">
                    <img className='w-24' src={apple} alt="app-store" />
                    <img className='w-[110px]' src={google} alt="google-paly" />
                    </div>
                </div>

            </div>
        </div>
    </footer>
</>
)}
