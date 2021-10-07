import { useFilterTrackedCTX } from 'context/GlobalContext';
import { useState } from 'react';
import UsersDropdown from '../UsersDropdown/index';
import { Tab, Wrapper } from './styled';

export default function NavigationTabs() {
  const [setIsFilterByTrack] = useFilterTrackedCTX();
  const [isTrackerActive, setIsTrackedActive] = useState(true);
  const [isTrackedItemsActive, setIsTrackedItemsActive] = useState(false);

  const onTrackerTabClickHandler = () => {
    setIsFilterByTrack(false);
    setIsTrackedActive(true);
    setIsTrackedItemsActive(false);
  };

  const onTrackedItemsTabClickHandler = () => {
    setIsFilterByTrack(true);
    setIsTrackedActive(false);
    setIsTrackedItemsActive(true);
  };

  return (
    <Wrapper>
      <UsersDropdown />
      <Tab active={isTrackerActive} onClick={onTrackerTabClickHandler}>
        Tracker
      </Tab>
      <Tab
        active={isTrackedItemsActive}
        onClick={onTrackedItemsTabClickHandler}
      >
        Tracked Items
      </Tab>
    </Wrapper>
  );
}
