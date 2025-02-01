import {useState} from "react";

function Navigation({ currentTab, setCurrentTab }: { currentTab: string, setCurrentTab: (newTab: string) => void }) {

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setMobileNavOpen(!mobileNavOpen);
    }

    return(
        <>
            <div className="hidden md:block w-screen">
                <nav className="bg-gray-900 text-white px-14 pt-4 flex flex-row gap-x-4 border-b">
                    <Tab title={"Game Rules"} active={currentTab == "rules"} onClick={() => setCurrentTab("rules")} />
                    <Tab title={"Missions"} active={currentTab == "missions"} onClick={() => setCurrentTab("missions")} />
                    <Tab title={"Preparations"} active={currentTab == "items"} onClick={() => setCurrentTab("items")} />
                    <Tab title={"Play The Game"} active={currentTab == "test"} onClick={() => setCurrentTab("test")} />
                </nav>
            </div>
            <div className="md:hidden w-screen">
                <div className="bg-gray-900 text-white pt-4 flex flex-row gap-x-4 border-b h-16">
                    <div className="flex-grow"></div>
                    <MobileNavOpenButton open={mobileNavOpen} toggleOpen={toggleMobileNav} />
                </div>
                {mobileNavOpen && <MobileNavbar currentTab={currentTab} setCurrentTab={setCurrentTab} />}
            </div>
        </>
    )
}

function MobileNavbar({ currentTab, setCurrentTab }: { currentTab: string, setCurrentTab: (newTab: string) => void }) {
    return (
        <nav className="bg-gray-900 text-white p-4 flex flex-col gap-3 border-b">
            <MobileTab title={"Game Rules"} active={currentTab == "rules"} onClick={() => setCurrentTab("rules")} />
            <MobileTab title={"Missions"} active={currentTab == "missions"} onClick={() => setCurrentTab("missions")} />
            <MobileTab title={"Preparations"} active={currentTab == "items"} onClick={() => setCurrentTab("items")} />
            <MobileTab title={"Play The Game"} active={currentTab == "test"} onClick={() => setCurrentTab("test")} />
        </nav>
    )
}

function Tab({ title, active, onClick }: { title: string, active: boolean, onClick: () => void }) {
    return (
        <div
            className={(
                    active ?
                        "bg-gray-700 text-white border-white transform translate-y-[1px]" : //Active tab styles
                        "bg-gray-800 text-neutral-400 border-neutral-600") + //Inactive tab styles
                " border-t border-x px-4 py-1 rounded-t-xl cursor-pointer text-center"} //Common tab styles
            onClick={onClick}>
            {title}
        </div>
    )
}

function MobileTab({ title, active, onClick }: { title: string, active: boolean, onClick: () => void }) {
    return (
        <div
            className={(
                    active ?
                        "bg-gray-700 text-white" : //Active tab styles
                        "bg-gray-800 text-neutral-400") + //Inactive tab styles
                " px-4 py-2 rounded-xl cursor-pointer text-center"} //Common tab styles
            onClick={onClick}>
            {title}
        </div>
    )
}

function MobileNavOpenButton ({ open, toggleOpen }: { open: boolean, toggleOpen: () => void }) {
    return (
        <div className="mr-8 lg:mr-10 group m-2" onClick={toggleOpen}>
            <div className={(open ? "translate-y-1 -rotate-45 group-hover:bg-red-500" : "-translate-y-2 group-hover:bg-neutral-200") + " rounded-full h-1 w-8 bg-white transition-all"}></div>
            <div className={(open ? "opacity-0 group-hover:bg-red-500" : "opacity-100 group-hover:bg-neutral-200") + " rounded-full h-1 w-8 bg-white  transition-all"}></div>
            <div className={(open ? "-translate-y-1 rotate-45 group-hover:bg-red-500" : "translate-y-2 group-hover:bg-neutral-200") + " rounded-full h-1 w-8 bg-white transition-all"}></div>
        </div>
    );
}

export default Navigation;