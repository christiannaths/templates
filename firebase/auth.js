import app from './firebase';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const auth = getAuth(app);

try {
  const url = new URL(
    `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`,
  );
  connectAuthEmulator(auth, url.href, { disableWarnings: true });
} catch (error) {
  console.error(error);
}

export default auth;
