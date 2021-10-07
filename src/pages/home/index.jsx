import { useEffect } from 'react';
import { Wrapper } from './styled';
import {
  useIsMessagePopupOpenedCTX,
  useIsPopupOpenedCTX,
  useSetUsersCTX,
} from 'context/GlobalContext';
import { getUsersAPI } from 'services/home/index';
import NavigationTabs from 'components/home/NavigationTabs/index';
import TrackPopup from 'components/home/TrackPopup/index';
import TableInfo from 'components/home/TableInfo/index';
import { useLocalStorage } from 'hooks/SHARED/index';
import { Header } from 'styles/SHARED/index';
import InfoPopup from 'components/SHARED/InfoPopup/index';

export default function Home() {
  const [, setUsers] = useSetUsersCTX();
  const [isPopupOpened] = useIsPopupOpenedCTX();
  const [isInfoPopupOpened, setIsInfoPopupOpened] =
    useIsMessagePopupOpenedCTX();
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    '_TRACK-APP_',
    null
  );

  useEffect(() => {
    (async () => {
      if (localStorageValue === null) {
        try {
          const users = await getUsersAPI();
          const usersExtended = users.map((user, index) => ({
            ...user,
            projectTime: 0,
            note: '',
            isTracked: false,
            indexArray: index,
          }));

          setLocalStorageValue(usersExtended);
          setUsers(usersExtended);
        } catch (error) {
          setIsInfoPopupOpened(true);
        }
      }

      if (localStorageValue !== null) {
        setUsers(localStorageValue);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Header>Time Tracker</Header>
      <NavigationTabs />
      <TableInfo />
      {isInfoPopupOpened && <InfoPopup message="Connection failed!!!" />}
      {isPopupOpened && <TrackPopup />}
    </Wrapper>
  );
}
