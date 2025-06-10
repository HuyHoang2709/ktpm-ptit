export const ThongTinLichDay = ({ lich }) => {
  return (
    <p className="font-semibold text-lg">
      Giáo viên {lich.dangkyday.giaovien.hoten} ({lich.phonghoc.ten})
    </p>
  );
};
