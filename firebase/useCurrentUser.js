import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import auth from 'services/auth';

const primaryKey = 'currentUser';

function adapter(authUser) {
  if (!authUser) return null;
  return {
    userId: authUser.uid,
    uid: authUser.uid,
    email: authUser.email,
    displayName: authUser.displayName,
    emailVerified: authUser.emailVerified,
    phoneNumber: authUser.phoneNumber,
    photoURL: authUser.photoURL,
    isAnonymous: authUser.isAnonymous,
    providerId: authUser.providerId,
  };
}

export async function getUser() {
  await auth.currentUser?.reload();
  return adapter(auth?.currentUser);
}

export function observeUserStateChange(callback) {
  return auth.onAuthStateChanged((authUser) => {
    callback(adapter(authUser));
  });
}

export function useUnauthenticatedRedirectEffect(
  required,
  { isLoading, isIdle, data },
) {
  const router = useRouter();
  const isSettled = !isLoading && !isIdle;
  const isAuthenticated = Boolean(data);

  useEffect(() => {
    if (!required) return;
    if (!isSettled) return;
    if (!isAuthenticated) router.push('/');
  }, [isAuthenticated, isSettled, required, router]);
}

export function useCurrentUser(options = {}) {
  const { required = false } = options;
  const queryClient = useQueryClient();
  const enabledRef = useRef(false);

  const query = useQuery({
    queryKey: primaryKey,
    async queryFn() {
      return await getUser();
    },
    enabled: enabledRef.current,
    retry: false,
  });

  useUnauthenticatedRedirectEffect(enabledRef.current && required, query);

  useEffect(() => {
    const unsubscribe = observeUserStateChange((currentUser) => {
      enabledRef.current = true;
      queryClient.setQueryData(primaryKey, currentUser);
    });

    return () => unsubscribe();
  }, [queryClient]);

  return query;
}
