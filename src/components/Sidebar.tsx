import { GoogleMap, Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api'; // Ensure you have the right import for Autocomplete
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({
  isSidebarVisible,
  toggleSidebar,
  openLocationChooser,
  openBusyTimeChooser,
  handleSubmit,
  formData,
  handleLocationChange,
  handleDeadlineChange,
  addTaskToTable,
  taskList,
  removeTaskFromTable,
  confirmSchedule,
  currentTask,
  handleTaskInputChange,
  handleAddTask,
  handleSetHomeClick,
  homeLocation,
  handleDeleteTask,
  busyTimes,
  handleEditBusyTime,
  handleDeleteBusyTime,
  handleAddBusyTime
}) => {
  return (
    <div className="flex h-screen">
   
      <div className="flex flex-col flex-grow">
        <div className="flex-grow relative">
         
          {isSidebarVisible && (
            <div className="absolute inset-y-0 right-0 max-w-xl flex flex-col rounded-lg bg-gray-100 p-4 overflow-y-auto">
              <h2 className="text-2xl font-bold p-3 text-[#9685CF]">
                أدخل العنوان والموعد النهائي لمشوارك
              </h2>
              <div className="w-full max-w-lg max-sm:w-[70vw] bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formData.locations.map((location, index) => (
                      <div key={index} className="flex flex-col space-y-2">
                        <input
                          id={`location-${index}`}
                          type="text"
                          value={location.address}
                          onChange={(e) => handleLocationChange(e, index)}
                          placeholder="العنوان"
                          className="w-full p-2 border rounded-lg"
                        />
                        <input
                          type="datetime-local"
                          value={location.deadline}
                          onChange={(e) => handleDeadlineChange(e, index)}
                          placeholder="حدد الموعد النهائي"
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                    ))}
                  </form>
                  <button
                    type="button"
                    onClick={addTaskToTable}
                    className="w-full mt-3 bg-[#9685CF] hover:bg-[#FFA842] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    إضافة المهمة
                  </button>
                </div>
              </div>

              {taskList.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold p-3 text-black">
                    قائمة المهام
                  </h2>
                  <div className="overflow-y-auto max-h-64 custom-scrollbar">
                    <table className="w-full bg-white rounded-lg shadow-md">
                      <thead>
                        <tr>
                          <th className="p-2 border">العنوان</th>
                          <th className="p-2 border">الموعد النهائي</th>
                          <th className="p-2 border">إجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {taskList.map((task, index) => (
                          <tr key={index}>
                            <td className="p-2 border text-[#9685CF] max-w-xs truncate">
                              {task.address}
                            </td>
                            <td className="p-2 border text-[#9685CF]">
                              {task.deadline}
                            </td>
                            <td className="p-2 border text-[#9685CF]">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-red-500 cursor-pointer"
                                onClick={() => removeTaskFromTable(index)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {taskList.length > 0 && (
                <button
                  onClick={confirmSchedule}
                  className="w-full bg-[#FFA842] hover:bg-[#9685CF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                >
                  تأكيد الجدول
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex-none p-4 overflow-y-auto">
          <button
            onClick={handleSetHomeClick}
            className="mb-4 bg-green-500 text-white p-2 rounded"
          >
            Set Home Location
          </button>
          {homeLocation && (
            <div className="mb-4">
              <h3 className="font-bold">Home Location:</h3>
              <p>{homeLocation.address}</p>
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
            <div className="mb-4">
              <Autocomplete>
                <input
                  type="text"
                  name="address"
                  value={currentTask.address}
                  onChange={handleTaskInputChange}
                  placeholder="Enter task location"
                  className="w-full p-2 border rounded"
                />
              </Autocomplete>
            </div>
            <div className="mb-4">
              <input
                type="datetime-local"
                name="deadline"
                value={currentTask.deadline}
                onChange={handleTaskInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Task
            </button>
          </form>
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">Tasks:</h3>
            <ul className="space-y-2">
              {taskList.map((task, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span>{task.address} - {new Date(task.deadline).toLocaleString()}</span>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">Busy Times:</h3>
            <ul className="space-y-2">
              {busyTimes.map((busyTime, index) => (
                <li key={index} className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
                  <input
                    type="time"
                    value={busyTime.start}
                    onChange={(e) => handleEditBusyTime(index, 'start', e.target.value)}
                    className="p-1 border rounded"
                  />
                  <span>-</span>
                  <input
                    type="time"
                    value={busyTime.end}
                    onChange={(e) => handleEditBusyTime(index, 'end', e.target.value)}
                    className="p-1 border rounded"
                  />
                  <button
                    onClick={() => handleDeleteBusyTime(index)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <input
                type="time"
                onChange={(e) => handleAddBusyTime({ start: e.target.value, end: '' })}
                className="w-full p-2 border rounded mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
