import { useSelector, useDispatch } from 'react-redux'
import { datVe } from '../redux/reducer'

export default function BookingSummary() {
    const dispatch = useDispatch();
    const { gheDangChon, thongTinDatVe, daXacNhan } = useSelector(state => state);
    const tongTien = gheDangChon.reduce((sum, ghe) => sum + ghe.gia, 0);

    const handleDatVe = () => {
        if(gheDangChon.length === 0) {
            alert('Vui lòng chọn ít nhất 1 ghế');
            return;
        }
        if(gheDangChon.length !== thongTinDatVe.soLuongGhe) {
            alert(`Vui lòng chọn đúng ${thongTinDatVe.soLuongGhe} ghế`);
            return;
        }
        
        dispatch(datVe());
        alert('Đặt vé thành công!');
    };

    if(!daXacNhan) {
        return null;
    }

    return (
        <div className="mt-6 text-left">
            <h2 className="text-xl font-bold mb-2">Danh sách ghế đã chọn</h2>
            <div className="mb-4">
                <p><strong>Khách hàng:</strong> {thongTinDatVe.tenKhach}</p>
                <p><strong>Số ghế đã chọn:</strong> {gheDangChon.length}/{thongTinDatVe.soLuongGhe}</p>
            </div>
            
            {gheDangChon.length > 0 && (
                <table className="w-full border text-center mb-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">STT</th>
                            <th className="border p-2">Số ghế</th>
                            <th className="border p-2">Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gheDangChon.map((ghe, index) => (
                            <tr key={index} className="border-t">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{ghe.soGhe}</td>
                                <td className="border p-2">{ghe.gia.toLocaleString()} đ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            <div className="font-bold mb-4">
                Tổng tiền: {tongTien.toLocaleString()} đ
            </div>
            
            <button
                onClick={handleDatVe}
                disabled={gheDangChon.length !== thongTinDatVe.soLuongGhe}
                className={`w-full py-2 px-4 rounded font-bold ${
                    gheDangChon.length === thongTinDatVe.soLuongGhe
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                Đặt vé ({gheDangChon.length}/{thongTinDatVe.soLuongGhe})
            </button>
        </div>
    )
}