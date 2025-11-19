import { useEffect } from 'react'
import Header from './Header'
import AgentsCRUD from './AgentsCRUD/AgentsCRUD';
import { useGetAdminAgentsQuery } from '../../services/service';
import { setAppAgents } from '../../store/slices/user';
import { useDispatch } from 'react-redux';

const SuperUserDrawersContent = ({classnames, containerRef}: {
  classnames: { container: string; drawerBtn: string };
  containerRef: React.RefObject<HTMLDivElement | null>;
  drawerButtonRef?: React.RefObject<HTMLLabelElement | null>; 
}) => {

  const { data: adminAgents } = useGetAdminAgentsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminAgents) {
      dispatch(setAppAgents((adminAgents as any)?.results?.agents));
    }
  }, [adminAgents, dispatch]);


  return (
    <div
      className={classnames.container}
      ref={containerRef}
    >
      <Header />
      {/* Agents Crud */}
      <AgentsCRUD />
    </div>
  )
}

export default SuperUserDrawersContent