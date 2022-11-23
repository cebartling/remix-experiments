import googleIcon from '~/assets/google.svg';

export default function SignUpWithGoogleButton({
  onClick,
}: {
  onClick: Function;
}) {
  function handleOnClick() {
    onClick();
  }

  return (
    <div
      className="sign-up-with-google-button-container"
      onClick={handleOnClick}
    >
      <div className="sign-up-with-google-button">
        <img
          src={googleIcon}
          alt="Google icon"
          className="sign-up-with-google-button-icon"
        />
        <div className="inline-block pt-[6px] align-middle">
          <span className="sign-up-with-google-button-text">
            Sign up with Google
          </span>
        </div>
      </div>
    </div>
  );
}
