import { useIsMessagePopupOpenedCTX } from 'context/GlobalContext';
import { Body, Button, Footer, Frame, Header, Wrapper } from './styled';

export default function InfoPopup({ message }) {
  const [, setIsInfoPopupOpened] = useIsMessagePopupOpenedCTX();

  const onClosePopupHandler = () => {
    setIsInfoPopupOpened(false);
  };

  return (
    <Wrapper onClick={onClosePopupHandler}>
      <Frame onClick={e => e.stopPropagation()}>
        <Header>Application Message</Header>

        <Body>{message}</Body>

        <Footer>
          <Button color="#ffbaba" onClick={onClosePopupHandler}>
            &#10005;
          </Button>
        </Footer>
      </Frame>
    </Wrapper>
  );
}
