import lightNormal from '~/assets/btn_google_light_normal_ios.svg';

interface SignIntoGoogleButtonProps {
  onClick: Function;
}

export default function SignIntoGoogleButton({
  onClick,
}: SignIntoGoogleButtonProps) {
  function handleOnClick() {
    onClick();
  }

  return (
    <button className="sign-into-google-button" onClick={handleOnClick}>
      <img src={lightNormal} alt="Sign into Google logo" /> Sign in with Google
    </button>
  );
}
