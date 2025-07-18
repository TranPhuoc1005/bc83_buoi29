import { useSelector } from 'react-redux'
import BookingForm from './BookingForm'
import SeatRow from './SeatRow'
import BookingSummary from './BookingSummary'
import BookingHistory from './BookingHistory'

export default function Layout() {
  const { danhSachGhe } = useSelector(state => state);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Đặt Vé Xem Phim</h1>
      <BookingForm />
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-4">Sơ đồ ghế</h2>
        <div className="inline-block border p-4 bg-gray-100 rounded">
          <div className="mb-2 text-sm text-gray-600">Màn hình</div>
          <div className="w-full h-1 bg-gray-800 mb-4"></div>
          {danhSachGhe.map((hangGhe, index) => (
            <SeatRow key={index} hangGhe={hangGhe} />
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 border rounded"></div>
            <span>Ghế trống</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-400 border rounded"></div>
            <span>Ghế đang chọn</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-500 border rounded"></div>
            <span>Ghế đã đặt</span>
          </div>
        </div>
      </div>
      <BookingSummary />
      <BookingHistory />
    </div>
  )
}