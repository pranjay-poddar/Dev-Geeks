import SideMenu from './SideMenu';

function Layout(props) {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-8">
          <div className="">
            <SideMenu />
          </div>
          <div className="p-8 bg-white col-span-3 rounded-lg">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Layout;
