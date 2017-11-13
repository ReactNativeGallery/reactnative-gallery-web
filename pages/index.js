export default () => (
  <div>
    <div className="bg-img"></div>
    <div>Welcome to React Native Gallery!</div>
    <style jsx>{`
      .bg-img {
        background-image: url("/static/images/background.jpeg");
        background-attachment: scroll;
        background-position: 50% 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: transparent;
        opacity: .53;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: "";
        z-index: 0;
      }
    `}</style>
  </div>
)