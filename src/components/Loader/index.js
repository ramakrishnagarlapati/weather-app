import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const LoaderComponent = ({
  type = "ThreeDots",
  color = "#FC4747",
  width = 50,
  height = 50,
}) => (
  <div className="loader-container">
    <ThreeDots color={color} width={width} height={height} />
  </div>
);
export default LoaderComponent;
