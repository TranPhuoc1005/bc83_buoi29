import Seat from './Seat'

export default function SeatRow({ hangGhe }) {
  return (
    <div>
        <span>{hangGhe.hang}</span>
        {hangGhe.danhSachGhe.map((ghe, index) =>(
            <Seat key={index} ghe={ghe} />
        ))}
    </div>
  )
}
