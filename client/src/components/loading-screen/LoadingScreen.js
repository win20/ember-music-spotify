import './loading-screen.css';

const LoadingScreen = () => {
  return (
    <div id="LoadingScreen" className="startAnimation">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
