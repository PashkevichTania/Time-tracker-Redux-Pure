import { useGlobalStateCTX } from 'context/GlobalContext';
import { Link } from 'react-router-dom';
import { Wrapper, Table, HeadCell, BodyCell, Row } from './styled';

export default function TableInfo() {
  const {
    users,
    tableFilter: { tracked },
  } = useGlobalStateCTX();

  let usersFilteredByTrack = users;

  if (tracked === true) {
    usersFilteredByTrack = usersFilteredByTrack.filter(
      user => user.isTracked === true
    );
  }

  return (
    <Wrapper>
      <Table>
        <thead>
          <Row>
            <HeadCell>Name</HeadCell>
            <HeadCell>Status</HeadCell>
            <HeadCell>More</HeadCell>
          </Row>
        </thead>

        <tbody>
          {usersFilteredByTrack.map(user => (
            <Row key={user.id}>
              <BodyCell>{user.name}</BodyCell>
              <BodyCell
                isTracked={user.isTracked}
              >{`${user.isTracked}`}</BodyCell>
              <BodyCell>
                <Link to={`/details?index=${user.indexArray}`}>more info</Link>
              </BodyCell>
            </Row>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}
