import Allbook from "../../components/Allbook.tsx";
import AllBeborred from "../../components/AllBeborred.tsx";
import BookBeborredType from "../../components/BookBeborredType.tsx";
const showEcharts: React.FC = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <div style={{ width: "50%", height: "100%" }}>
          <Allbook />
        </div>
        <div style={{ width: "30%", height: "100%" }}>
          <BookBeborredType />
        </div>
      </div>
      <div style={{ width: "100%", height: "30vh" }}>
        <AllBeborred />
      </div>
    </div>
  );
};
export default showEcharts;
