import "daisyui/src/colors";
import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import swal from "sweetalert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MultiSelect } from "react-multi-select-component";
import "../Post/CreatePost.css";

const CreatePost = () => {
  //CURRENT SHOW PAGE
  const [isShow, setIsShow] = useState(false);

  //SELECT HASHTAG
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  //get name
  const getName = localStorage.getItem("user");
  const name = getName.slice(0, 2);

  //GET DATE TIME
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  // EVENT SHOW CURRENT PAGE
  const handleOnClick = () => {
    setIsShow(true);
  };

  // CONNECT API SUBCATEGORY
  useEffect(() => {
    fetch("https://univelear.herokuapp.com/api/subcategory")
      .then((res) => res.json())
      .then((json) => {
        const data = [];
        // console.log('before',data);
        json.data.forEach((element) => {
          data.push({ label: element.sub_name, value: element.id });
        });
        // console.log('after',data);
        setOptions(data);
        // console.log("clear data", data);

        setTimeout(() => {}, 3000);
      });
  }, []);

  // CONNECT API CREATE
  const token = localStorage.getItem("token");
  async function CreatePost(credentials) {
    return fetch("https://univelear.herokuapp.com/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .then(console.log(credentials));
  }
  // SET STATE FORM SUBMIT
  const classes = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const sub_id = 1;
  const [image, setImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const select_label = [];
    selected.forEach((element) => {
      select_label.push(element.label);
    });
    const response = await CreatePost({
      title,
      body,
      sub_id,
      hastag: select_label,
      image,
    });
    // RESPONSE SUBMIT
    if (response.success) {
      swal("Success", response.message, "successfully.", {
        buttons: false,
        icon: "success",
        timer: 2000,
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  //convert file Img to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const Create = () => {
    return (
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4  ">
        <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
          <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center ">
            <div className="text-left">
              <span className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 text-blue-500 ">
                Post Blog
              </span>
              <span className="pl-5">/</span>
              <a
                className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 hover:text-blue-500 "
                onClick={handleOnClick}
              >
                Create Course
              </a>
            </div>

            {/* from input Text */}
            <form onSubmit={handleOnClick}>
              <li className="flex mt-5">
                <TextareaAutosize
                  type="title"
                  className="resize-none textarea textarea-ghost w-full h-full form-control text-4xl leading-10 text-slate-900  tracking-widest font-bold 
                         block px-3 py-2 m-0 bg-white bg-clip-padding "
                  placeholder="Title"
                  required
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </li>

              {/* input Text editor */}
              <div className="mt-2">
                <CKEditor
                  editor={ClassicEditor}
                  data={body}
                  // config={editorConfiguration}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setBody(data);
                    // console.log(body);
                  }}
                />
              </div>

              {/* input Hashtag  */}
              <div className="multi-select w-30 h-50">
                <h1>Select Hashtag</h1>
                <MultiSelect
                  defaultValue={selected}
                  options={options}
                  value={selected}
                  onChange={setSelected}
                />
              </div>

              {/* input Img */}
              <div className="mt-5 ">
                <input
                  type="file"
                  label="Image"
                  name="myFile"
                  accept=".jpeg, .png, .jpg, .gif" //set type
                  onChange={(e) => handleFileUpload(e)}
                />
              </div>

              <div className="mt-5  grid justify-items-end">
                <button class="btn btn-outline ml-5">Previews</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const Preview = () => {
    const stripedHtml = body.replace(/<[^>]+>|&nbsp;/g, "");
    const body_length = stripedHtml.slice(0, 400) + " ...";
    // console.log("len", body_length);

    console.log("strip", stripedHtml);
    return (
      <div
        className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
          <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
            <div className="text-left" onClick={() => setIsShow(false)}>
              <a className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 hover:text-blue-500 ">
                Post Blog
              </a>
              <span className="pl-5">/</span>
              <span className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600  text-blue-500 ">
                Create Course
              </span>
            </div>
            <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4 ">
              Preview
            </h2>

            <div class="flex justify-center mt-5">
              <div class="flex flex-col md:flex-row  rounded-lg bg-white shadow-lg">
                <img
                  class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                  src={image}
                  alt="cover_image"
                />
                <div class="p-4  flex-col justify-start h-30 bg-gray-100">
                  <div className="grid grid-cols-2  ">
                    <div className="text-gray-600 text-xs ">PRODUCTIVITY</div>
                    <div className="text-gray-600 text-xs place-self-end ">
                      {date}
                    </div>
                  </div>

                  <h5 class="flex text-gray-900 text-xl font-medium font-bold mb-2 mt-3">
                    {title}
                  </h5>

                  <p class="md:text-clip text-gray-400 text-base  mb-10 ">
                    {body_length}
                  </p>

                  <div class="grid grid-flow-col grid grid-cols-2 mt-20 w-full place-self-end">
                    <div class="flex items-center w-50 ">
                      {/* personal photo */}
                      <div class="avatar placeholder w-10 h-10 rounded-full mr-5">
                        <div class="bg-neutral-focus text-neutral-content rounded-full w-12 uppercase">
                          <span>{name}</span>
                        </div>
                      </div>

                      <div class="space-y-1 font-medium dark:text-white">
                        <div className="text-xs font-bold ">{getName}</div>
                        <div class="text-gray-600 text-xs ">{time}</div>
                      </div>
                    </div>

                    <div class="w-50 place-self-end">
                      <div class="font-medium dark:text-white">
                        <div class="ml-9 text-blue-600 text-xs mt-5">
                          Read more
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* button  */}
            {/* <button
              className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6"
              onClick={handleSubmit}
            >
              Post
            </button> */}
            <div className="mt-5 grid justify-items-end">
              <div>
                <button
                  class="btn btn-outline"
                  onClick={() => setIsShow(false)}
                >
                  EDIT
                </button>
                <button class="btn btn-outline ml-3 " onClick={handleSubmit}>
                  POST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{isShow ? <Preview /> : Create()}</>;
};

export default CreatePost;
