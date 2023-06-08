import "./Loading.scss";

export default function Loading() {
  return (
    <div className="d-flex flex-column flex-fill justify-content-center align-items-center">
      <div>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div>
        <p>Loading</p>
      </div>
    </div>
  );
}
