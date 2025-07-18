import { useDispatch, useSelector } from 'react-redux'
import { chonGhe } from '../redux/reducer'

export default function Seat({ ghe }) {
    const dispatch = useDispatch();
    const { gheDangChon, daXacNhan, thongTinDatVe } = useSelector(state => state);

    const isSelected = gheDangChon.some(item => item.soGhe === ghe.soGhe);

    const handleClick = () => {
        if(ghe.daDat || !daXacNhan) return;
        if(!isSelected && gheDangChon.length >= thongTinDatVe.soLuongGhe) {
            alert(`Bạn chỉ có thể chọn tối đa ${thongTinDatVe.soLuongGhe} ghế`);
            return;
        }
        dispatch(chonGhe(ghe));
    }
    let bgColor = "bg-gray-300";
    let cursor = "cursor-pointer";
    if(ghe.daDat) {
        bgColor = "bg-red-500";
        cursor = "cursor-not-allowed";
    } else if(isSelected) {
        bgColor = "bg-yellow-400";
    } else if(!daXacNhan) {
        bgColor = "bg-gray-200";
        cursor = "cursor-not-allowed";
    }
    return (
        <button
            className={`w-8 h-8 mx-1 mb-1 ${bgColor} ${cursor} border rounded text-sm font-bold text-black`}
            onClick={handleClick}
            disabled={ghe.daDat || !daXacNhan}
            title={
                ghe.daDat ? 'Ghế đã được đặt' : 
                !daXacNhan ? 'Vui lòng xác nhận thông tin trước' :
                isSelected ? 'Bỏ chọn ghế' : 
                'Chọn ghế'
            }
        >
            {ghe.soGhe}
        </button>
    )
}