import { useSelector, useDispatch } from 'react-redux'
import { huyHoaDon } from '../redux/reducer'

export default function BookingHistory() {
    const dispatch = useDispatch();
    const { lichSuDatVe } = useSelector(state => state);

    const handleHuyHoaDon = (hoaDonId) => {
        if(window.confirm('Bạn có chắc chắn muốn hủy hóa đơn này?')) {
            dispatch(huyHoaDon(hoaDonId));
            alert('Hủy hóa đơn thành công!');
        }
    };
    if(lichSuDatVe.length === 0) {
        return null;
    }
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Lịch sử đặt vé</h2>
            <div className="overflow-x-auto">
                <table className="w-full border text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">STT</th>
                            <th className="border p-2">Tên khách hàng</th>
                            <th className="border p-2">Số ghế</th>
                            <th className="border p-2">Tổng tiền</th>
                            <th className="border p-2">Thời gian</th>
                            <th className="border p-2">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lichSuDatVe.map((hoaDon, index) => (
                            <tr key={hoaDon.id} className="border-t">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{hoaDon.tenKhach}</td>
                                <td className="border p-2">
                                    {hoaDon.danhSachGhe.map(ghe => ghe.soGhe).join(', ')}
                                </td>
                                <td className="border p-2">{hoaDon.tongTien.toLocaleString()} đ</td>
                                <td className="border p-2">{hoaDon.thoiGian}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleHuyHoaDon(hoaDon.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Hủy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}