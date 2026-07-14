
import Header from "../../components/Dashboard/Header/Header"
import { useState } from "react";
import { useGetClosedResolvedChatsQuery } from "../../services/service";
import type { ChatMessage } from "../../types/Slices";

const History = () => {
  const { data: closedResolvedChats } = useGetClosedResolvedChatsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [closedTickets] = useState([])
  const [deletedTickets] = useState([])

  console.log("Closed/Resolved Chats:", closedResolvedChats);

  return (
    <div className=" !min-w-full !min-h-[100dvh]">
      <Header />
      <div className='flex flex-col items-center justify-center pb-14'>
        <div className=" h-full pt-6 text-white relative w-full text-center flex flex-col items-center">
          <h1 className="!text-xl md:!text-3xl  font-bold mb-8">History</h1>
          <Tabs 
            closedTickets={closedTickets}
            deletedTickets={deletedTickets}
          />
          
        </div>
      </div>
    </div>
  )
}

type TabsProps = {
  closedTickets: ChatMessage[];
  deletedTickets: ChatMessage[];
};

const Tabs: React.FC<TabsProps> = ({ closedTickets, deletedTickets }) => {
  const tabStyles = {
    // Main container for the tab group
    outerContainer: "justify-center max-w-4xl w-[75%]",
    container: "tabs tabs-lift",

    // Title
    title: "md:text-md mb-2 bg-cyan-50 p-4 rounded-md text-gray-700",
    
    // Default styles for all tab labels
    tabBase: "tab grow bg-cyan-50 text-gray-500 hover:text-gray-700 transition-colors",
    
    // Dynamic styles when the internal radio is checked
    tabSelected: "has-[:checked]:text-gray-700 has-[:checked]:font-bold",
    
    // Utility to remove DaisyUI's default "lifted" artifacts (pseudo-elements & bottom border)
    tabClean: "!border-b-0 before:!hidden after:!hidden",
    
    // Styles for the tab content area
    contentBox: "tab-content bg-cyan-50 border-base-300 p-6 text-secondary !rounded-t-none"
  };

  return (
    <div className={tabStyles.outerContainer}>
      <div className={tabStyles.title}>
          Consulta los tickets que han sido cerrados o eliminados. 
          Puedes restaurarlos si es necesario.
      </div>
      <div className={tabStyles.container}>
        {/* Tab 1: Resolved/Closed */}
        <label className={`${tabStyles.tabBase} ${tabStyles.tabSelected}`}>
          <input type="radio" name="my_tabs_4" className="hidden" />
          Resueltos/Cerrados
        </label>
        <div className={tabStyles.contentBox}>
          {
            closedTickets.length === 0 ? (
              <Alert message="No closed tickets" />
            ) : (
              <p className="text-center text-gray-500">Closed tickets: {closedTickets.length}</p>
            )
          }
        </div>

        {/* Tab 2: Deleted */}
        <label className={`${tabStyles.tabBase} ${tabStyles.tabSelected} ${tabStyles.tabClean}`}>
          <input type="radio" name="my_tabs_4" defaultChecked className="hidden" />
          Eliminados
        </label>
        <div className={tabStyles.contentBox}>
          {
            deletedTickets.length === 0 ? (
              <Alert message="No deleted tickets" />
            ) : (
              <p className="text-center text-gray-500">Deleted tickets: {deletedTickets.length}</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

const Alert = ({message}: {message: string}) => {
  return (
    <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md text-start" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
        </div>
        <div>
          <p className="font-bold">Info</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default History