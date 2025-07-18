import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatThongTin, xacNhanThongTin, resetForm } from '../redux/reducer'

export default function BookingForm() {
    const dispatch = useDispatch();
    const { thongTinDatVe, daXacNhan } = useSelector(state => state);
    const [tenKhach, setTenKhach] = useState('');
    const [soLuongGhe, setSoLuongGhe] = useState(1);

    const handleXacNhan = () => {
        if(tenKhach.trim() === '') {
            alert('Vui lòng nhập tên khách hàng');
            return;
        }
        if(soLuongGhe < 1 || soLuongGhe > 12) {
            alert('Số lượng ghế phải từ 1 đến 12');
            return;
        }
        
        dispatch(capNhatThongTin({ tenKhach, soLuongGhe }));
        dispatch(xacNhanThongTin());
    };

    const handleReset = () => {
        setTenKhach('');
        setSoLuongGhe(1);
        dispatch(resetForm());
    };

    if(daXacNhan) {
        return (
            <div className="bg-blue-100 p-4 rounded mb-4">
                <h3 className="font-bold text-lg mb-2">Thông tin đặt vé</h3>
                <p><strong>Tên khách hàng:</strong> {thongTinDatVe.tenKhach}</p>
                <p><strong>Số lượng ghế:</strong> {thongTinDatVe.soLuongGhe}</p>
                <button 
                    onClick={handleReset}
                    className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Đặt lại
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 p-4 rounded mb-4">
            <h3 className="font-bold text-lg mb-4">Thông tin đặt vé</h3>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tên khách hàng:</label>
                <input
                    type="text"
                    value={tenKhach}
                    onChange={(e) => setTenKhach(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Nhập tên khách hàng"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Số lượng ghế:</label>
                <select
                    value={soLuongGhe}
                    onChange={(e) => setSoLuongGhe(parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                >
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleXacNhan}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Xác nhận thông tin
            </button>
        </div>
    );
}