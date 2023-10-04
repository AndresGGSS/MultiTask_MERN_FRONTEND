import useProyect from "../hooks/useProyect";

const Collaborators = ({ collaborator }) => {
    const { name, email } = collaborator;
    const { handleModalDeleteCollaborators } = useProyect();

    return (
        <div className="border p-5 mb-4 rounded-md shadow-md bg-white flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10 mr-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <div>
                    <p className="mb-1 text-xl uppercase">{name}</p>
                    <p className="mb-1 text-sm text-gray-500">{email}</p>
                </div>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
                <button
                    className="bg-red-600 w-full md:w-auto px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalDeleteCollaborators(collaborator)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Collaborators;
