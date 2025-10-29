import { useState } from 'react';
import { 
  MdBarChart, 
  MdInsertDriveFile, 
  MdCalendarToday, 
  MdSettings, 
  MdShare, 
  MdLink, 
  MdClose,
  MdAdd,
  MdKeyboardArrowDown,
  MdTag,
  MdListAlt
} from 'react-icons/md';
import { FaLaugh, FaHashtag } from 'react-icons/fa';

/* Consolidated Tailwind classes */
const classNames = {
  modal: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm",
  modalContent: "w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden",
  modalHeader: "flex items-center justify-between p-6 border-b border-gray-100",
  modalTitle: "text-lg font-semibold text-gray-900",
  modalClose: "p-1.5 rounded-lg hover:bg-gray-100 transition-colors",
  modalBody: "flex flex-col lg:flex-row max-h-[80vh]",

  sidebar: "w-full lg:w-80 bg-gray-50/80 backdrop-blur-sm border-r lg:border-r border-gray-100 p-6 space-y-6 overflow-y-auto",
  sidebarHeader: "flex items-center gap-2 text-gray-900",
  sidebarDesc: "text-sm text-gray-600 leading-relaxed",
  sidebarNav: "space-y-1",
  navItem: "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
  navItemActive: "bg-white text-gray-900 shadow-sm",
  navItemInactive: "text-gray-600 hover:bg-white/60",
  navBadge: "ml-auto text-xs font-medium text-blue-600",

  main: "flex-1 p-6 lg:p-8 overflow-y-auto",
  mainHeader: "flex items-center justify-between mb-6",
  mainTitle: "text-base font-medium text-gray-900",
  mainClose: "p-1.5 rounded-lg hover:bg-gray-100 transition-colors",
  section: "space-y-4",
  sectionTitle: "text-sm font-medium text-gray-900",
  input: "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all",
  pollTypeTabs: "flex gap-2 p-1 bg-gray-100 rounded-xl",
  pollTypeTab: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
  pollTypeActive: "bg-white text-gray-900 shadow-sm",
  pollTypeInactive: "text-gray-600 hover:text-gray-900",
  optionItem: "flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl",
  optionIcon: "w-5 h-5 text-gray-400",
  optionInput: "flex-1 bg-transparent outline-none placeholder-gray-400",
  optionRemove: "p-1.5 rounded-lg hover:bg-gray-100 transition-colors",
  addOption: "flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer",
  
  durationTabs: "flex gap-2 p-1 bg-gray-100 rounded-xl",
  durationTab: "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-center",
  durationActive: "bg-white text-gray-900 shadow-sm",
  durationInactive: "text-gray-600 hover:text-gray-900",
  durationSelects: "flex gap-3",
  select: "flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none cursor-pointer bg-[length:12px_12px] bg-[right_12px_center] bg-no-repeat",
  selectArrow: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none",

  footer: "flex items-center justify-between p-6 border-t border-gray-100",
  stepProgress: "flex items-center gap-2 text-sm text-gray-600",
  stepBar: "flex-1 h-1 bg-gray-200 rounded-full overflow-hidden",
  stepFill: "h-full bg-blue-600 rounded-full",
  footerButtons: "flex gap-3",
  btnCancel: "px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors",
  btnContinue: "px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
};

export default function PollCreationModal() {
  const [pollType, setPollType] = useState('select');
  const [durationTab, setDurationTab] = useState('endDate');

  return (
    <div className={classNames.modal}>
      <div className={classNames.modalContent}>
        {/* Header */}
        <header className={classNames.modalHeader}>
          <div className={classNames.sidebarHeader}>
            <MdBarChart className="w-5 h-5" />
            <h2 className={classNames.modalTitle}>Insert a Simple Poll</h2>
          </div>
          <button className={classNames.modalClose}>
            <MdClose className="w-5 h-5 text-gray-600" />
          </button>
        </header>

        <div className={classNames.modalBody}>
          {/* Sidebar */}
          <aside className={classNames.sidebar}>
            <p className={classNames.sidebarDesc}>
              Simple Poll is a tool for creating quick polls, letting users easily vote on various options and collect feedback.
            </p>

            <nav className={classNames.sidebarNav}>
              <div className={`${classNames.navItem} ${classNames.navItemActive}`}>
                <MdInsertDriveFile className="w-5 h-5" />
                <span>Question & answers</span>
              </div>
              <div className={`${classNames.navItem} ${classNames.navItemInactive}`}>
                <MdListAlt className="w-5 h-5" />
                <span>Choose template</span>
                <span className={classNames.navBadge}>+ New</span>
              </div>
              <div className={`${classNames.navItem} ${classNames.navItemInactive}`}>
                <MdLink className="w-5 h-5" />
                <span>Poll placement</span>
              </div>
              <div className={`${classNames.navItem} ${classNames.navItemInactive}`}>
                <MdCalendarToday className="w-5 h-5" />
                <span>Schedule</span>
              </div>
              <div className={`${classNames.navItem} ${classNames.navItemInactive}`}>
                <MdSettings className="w-5 h-5" />
                <span>Advanced settings</span>
              </div>
              <div className={`${classNames.navItem} ${classNames.navItemInactive}`}>
                <MdShare className="w-5 h-5" />
                <span>Integration</span>
              </div>
              <div className={`${classNames.navItem} ${classNames.navItemInactive}`}>
                <MdShare className="w-5 h-5" />
                <span>Share or embed poll</span>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className={classNames.main}>
            <header className={classNames.mainHeader}>
              <h3 className={classNames.mainTitle}>Question & answers</h3>
              <button className={classNames.mainClose}>
                <MdClose className="w-5 h-5 text-gray-600" />
              </button>
            </header>

            <section className={classNames.section}>
              <label className={classNames.sectionTitle}>Ask a question</label>
              <input
                type="text"
                placeholder="Type your question..."
                className={classNames.input}
              />
            </section>

            <section className={classNames.section}>
              <label className={classNames.sectionTitle}>Poll type</label>
              <div className={classNames.pollTypeTabs}>
                <button
                  onClick={() => setPollType('select')}
                  className={`${classNames.pollTypeTab} ${pollType === 'select' ? classNames.pollTypeActive : classNames.pollTypeInactive}`}
                >
                  <MdListAlt className="w-4 h-4" />
                  Select list
                </button>
                <button
                  onClick={() => setPollType('emoji')}
                  className={`${classNames.pollTypeTab} ${pollType === 'emoji' ? classNames.pollTypeActive : classNames.pollTypeInactive}`}
                >
                  <FaLaugh className="w-4 h-4" />
                  Emojis
                </button>
                <button
                  onClick={() => setPollType('numerical')}
                  className={`${classNames.pollTypeTab} ${pollType === 'numerical' ? classNames.pollTypeActive : classNames.pollTypeInactive}`}
                >
                  <FaHashtag className="w-4 h-4" />
                  Numerical
                </button>
              </div>
            </section>

            <section className={classNames.section}>
              <label className={classNames.sectionTitle}>Options</label>
              <div className="space-y-3">
                <div className={classNames.optionItem}>
                  {pollType === 'emoji' ? <FaLaugh className={classNames.optionIcon} /> : <MdTag className={classNames.optionIcon} />}
                  <input
                    type="text"
                    placeholder="I'm touched"
                    className={classNames.optionInput}
                  />
                  <button className={classNames.optionRemove}>
                    <MdClose className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className={classNames.optionItem}>
                  <MdTag className={classNames.optionIcon} />
                  <input
                    type="text"
                    placeholder="Type optional description..."
                    className={classNames.optionInput}
                  />
                  <button className={classNames.optionRemove}>
                    <MdClose className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <button className={classNames.addOption}>
                  <MdAdd className="w-4 h-4" />
                  Add option
                </button>
              </div>
            </section>

            <section className={classNames.section}>
              <label className={classNames.sectionTitle}>Duration</label>
              <div className={classNames.durationTabs}>
                <button
                  onClick={() => setDurationTab('endDate')}
                  className={`${classNames.durationTab} ${durationTab === 'endDate' ? classNames.durationActive : classNames.durationInactive}`}
                >
                  Set end date
                </button>
                <button
                  onClick={() => setDurationTab('length')}
                  className={`${classNames.durationTab} ${durationTab === 'length' ? classNames.durationActive : classNames.durationInactive}`}
                >
                  Set length
                </button>
              </div>

              {durationTab === 'length' && (
                <div className={classNames.durationSelects}>
                  <div className="relative">
                    <select className={`${classNames.select} pr-10`} style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")` }}>
                      <option>1 days</option>
                    </select>
                    <MdKeyboardArrowDown className={classNames.selectArrow} />
                  </div>
                  <div className="relative">
                    <select className={`${classNames.select} pr-10`} style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")` }}>
                      <option>0 hours</option>
                    </select>
                    <MdKeyboardArrowDown className={classNames.selectArrow} />
                  </div>
                  <div className="relative">
                    <select className={`${classNames.select} pr-10`} style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")` }}>
                      <option>0 minutes</option>
                    </select>
                    <MdKeyboardArrowDown className={classNames.selectArrow} />
                  </div>
                </div>
              )}
            </section>
          </main>
        </div>

        {/* Footer */}
        <footer className={classNames.footer}>
          <div className={classNames.stepProgress}>
            <span>Step 1 of 7</span>
            <div className={classNames.stepBar}>
              <div className={`${classNames.stepFill} w-1/7`} />
            </div>
          </div>
          <div className={classNames.footerButtons}>
            <button className={classNames.btnCancel}>Cancel</button>
            <button className={classNames.btnContinue}>Continue</button>
          </div>
        </footer>
      </div>
    </div>
  );
}