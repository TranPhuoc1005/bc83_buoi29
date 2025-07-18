import { createSlice } from '@reduxjs/toolkit'
import danhSachGhe from '../danhSachGhe.json'

const initialState = {
    danhSachGhe: danhSachGhe,
    gheDangChon: [],
    thongTinDatVe: {
        tenKhach: '',
        soLuongGhe: 0
    },
    daXacNhan: false,
    lichSuDatVe: []
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        capNhatThongTin: (state, action) => {
            state.thongTinDatVe = action.payload;
        },
        xacNhanThongTin: (state) => {
            state.daXacNhan = true;
        },
        chonGhe: (state, action) => {
            const ghe = action.payload;
            const index = state.gheDangChon.findIndex(item => item.soGhe === ghe.soGhe);

            if(index !== -1) {
                state.gheDangChon.splice(index, 1);
            } else {
                if(state.gheDangChon.length < state.thongTinDatVe.soLuongGhe) {
                    state.gheDangChon.push(ghe);
                }
            }
        },
        datVe: (state) => {
            const hoaDonMoi = {
                id: Date.now(),
                tenKhach: state.thongTinDatVe.tenKhach,
                danhSachGhe: [...state.gheDangChon],
                tongTien: state.gheDangChon.reduce((sum, ghe) => sum + ghe.gia, 0),
                thoiGian: new Date().toLocaleString()
            };
            state.lichSuDatVe.push(hoaDonMoi);
            state.gheDangChon.forEach(gheChon => {
                state.danhSachGhe.forEach(hangGhe => {
                    hangGhe.danhSachGhe.forEach(ghe => {
                        if(ghe.soGhe === gheChon.soGhe) {
                            ghe.daDat = true;
                        }
                    });
                });
            });
            
            state.gheDangChon = [];
            state.thongTinDatVe = { tenKhach: '', soLuongGhe: 0 };
            state.daXacNhan = false;
        },
        huyHoaDon: (state, action) => {
            const hoaDonId = action.payload;
            const hoaDon = state.lichSuDatVe.find(hd => hd.id === hoaDonId);
            
            if(hoaDon) {
                hoaDon.danhSachGhe.forEach(gheHuy => {
                    state.danhSachGhe.forEach(hangGhe => {
                        hangGhe.danhSachGhe.forEach(ghe => {
                            if(ghe.soGhe === gheHuy.soGhe) {
                                ghe.daDat = false;
                            }
                        });
                    });
                });
                state.lichSuDatVe = state.lichSuDatVe.filter(hd => hd.id !== hoaDonId);
            }
        },
        resetForm: (state) => {
            state.gheDangChon = [];
            state.thongTinDatVe = { tenKhach: '', soLuongGhe: 0 };
            state.daXacNhan = false;
        }
    }
});

export const { capNhatThongTin, xacNhanThongTin, chonGhe, datVe, huyHoaDon, resetForm } = bookingSlice.actions;
export default bookingSlice.reducer;