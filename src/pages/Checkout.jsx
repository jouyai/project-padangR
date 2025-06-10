import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import Button from '../components/common/Button'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const { cartItems, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })
  
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 15000

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitOrder = () => {
    // Proses order di sini (biasanya API call)
    console.log('Order submitted:', {
      items: cartItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    })
    
    // Clear cart dan lanjut ke konfirmasi
    clearCart()
    setStep(3)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/cart" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <FiArrowLeft className="mr-2" /> Kembali ke Keranjang
        </Link>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <div className="text-sm text-gray-500">Langkah {step} dari 3</div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-gray-900 -z-10 transition-all duration-300" 
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          ></div>
          
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step > stepNumber ? <FiCheckCircle /> : stepNumber}
              </div>
              <span className={`text-xs mt-2 ${step >= stepNumber ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                {stepNumber === 1 ? 'Alamat' : stepNumber === 2 ? 'Pembayaran' : 'Konfirmasi'}
              </span>
            </div>
          ))}
        </div>
        
        {/* Step 1: Shipping Address */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Alamat Pengiriman</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima</label>
                <input
                  type="text"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea
                name="address"
                value={shippingAddress.address}
                onChange={handleAddressChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <Button 
                onClick={() => setStep(2)}
                disabled={!shippingAddress.name || !shippingAddress.phone || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode}
                className="bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lanjut ke Pembayaran
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Metode Pembayaran</h2>
            
            <div className="space-y-4 mb-8">
              <div 
                className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'bank_transfer' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('bank_transfer')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'bank_transfer' ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
                    {paymentMethod === 'bank_transfer' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <h3 className="font-medium">Transfer Bank</h3>
                </div>
                {paymentMethod === 'bank_transfer' && (
                  <div className="mt-3 pl-8">
                    <p className="text-sm text-gray-600 mb-2">Pembayaran melalui transfer ke rekening bank kami</p>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bank BCA</span>
                        <span className="font-mono">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bank Mandiri</span>
                        <span className="font-mono">0987654321</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'ewallet' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('ewallet')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'ewallet' ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
                    {paymentMethod === 'ewallet' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <h3 className="font-medium">E-Wallet</h3>
                </div>
                {paymentMethod === 'ewallet' && (
                  <div className="mt-3 pl-8">
                    <p className="text-sm text-gray-600 mb-2">Pembayaran melalui dompet digital</p>
                    <div className="flex space-x-3">
                      <button className="p-2 border border-gray-200 rounded-md">
                        <img src="/images/gopay.png" alt="Gopay" className="h-6" />
                      </button>
                      <button className="p-2 border border-gray-200 rounded-md">
                        <img src="/images/ovo.png" alt="OVO" className="h-6" />
                      </button>
                      <button className="p-2 border border-gray-200 rounded-md">
                        <img src="/images/dana.png" alt="DANA" className="h-6" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                onClick={() => setStep(1)}
                className="text-gray-900 border border-gray-300 hover:bg-gray-50"
              >
                Kembali
              </Button>
              <Button 
                onClick={handleSubmitOrder}
                disabled={!paymentMethod}
                className="bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buat Pesanan
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Order Confirmation */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FiCheckCircle size={32} className="text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h2>
            <p className="text-gray-600 mb-6">Terima kasih telah berbelanja di SecondStyle</p>
            
            <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-medium text-gray-900 mb-4">Detail Pesanan</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">No. Pesanan</span>
                  <span className="font-medium">#SS-{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Pembayaran</span>
                  <span className="font-medium">Rp{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Metode Pembayaran</span>
                  <span className="font-medium">
                    {paymentMethod === 'bank_transfer' ? 'Transfer Bank' : 'E-Wallet'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/" className="flex-1">
                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
                  Belanja Lagi
                </Button>
              </Link>
              <button className="flex-1">
                <Button className="w-full border border-gray-300 text-gray-900 hover:bg-gray-50">
                  Lihat Pesanan
                </Button>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout