export const ThongTinLichDay = ({ lich }) => {
  return (
    <p className="font-semibold text-lg">
      Lớp {lich.dangkyday.lophoc.ten} ({lich.phonghoc.ten})
    </p>
  );
};
