import { useContext } from "react";
import { ImageContext } from "../context/ImageState";
import { Link } from "react-router-dom";

const Home = () => {
  const { url, loader, image, handleText, onClickHandler, handleDownload } =
    useContext(ImageContext);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center gap-5">
          <p className="text-2xl text-center">
            Stable Diffusion is a latent text-to-image diffusion model capable
            of generating photo-realistic images given any text input.
          </p>
          <textarea
            onChange={handleText}
            className="h-40 outline-none focus:border-green-400 resize-none p-4 text-white text-xl bg-transparent border rounded-xl border-white w-full "
            placeholder="Enter some text to generate an image..."
          ></textarea>
          <button
            className="px-2 py-4 hover:bg-green-500 border duration-500 border-green-400 text-lg rounded-lg uppercase font-semibold "
            onClick={onClickHandler}
          >
            Generate Image
          </button>
          {loader && (
            <div disabled type="button" className="scale-110 text-xl">
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Genrating...
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          {url && (
            <>
              <img
                src={image}
                alt="can't generate refresh!!"
                width={300}
                height={100}
              />
              <div className="w-full flex justify-center items-center gap-4">
                <Link
                  to="/edit"
                  className="text-center px-3 w-2/4 py-3 uppercase font-semibold hover:bg-sky-500  duration-500 border-sky-500 border rounded-lg"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDownload}
                  className="px-3 w-2/4 py-3 uppercase font-semibold hover:bg-white hover:text-black duration-500 border-white border rounded-lg"
                >
                  Download
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
