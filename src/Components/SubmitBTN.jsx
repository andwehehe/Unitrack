
function SubmitBTN({ prompt, setOpenOrder }) {

    return(
        <button
            type="submit"
            className="
                w-full bg-blue-500 text-white p-1 rounded 
                hover:bg-button_primary md:mt-4 py-2 font-semibold"
            onClick={() => setOpenOrder(prev => !prev)}
        >
            {prompt}
        </button>
    );
}

export default SubmitBTN