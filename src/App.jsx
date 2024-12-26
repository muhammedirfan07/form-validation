
import {
  Button,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";

function App() {
  // Dob calendar
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [userAddress, setUserAddress] = useState("");

  // Validation state
  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidMobileNumber, setInvalidMobileNumber] = useState(false);
  const [invalidGender, setInvalidGender] = useState(false);
  const [invalidDob, setInvalidDob] = useState(false);
  const [invalidCourse, setInvalidCourse] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);

  const validateForm = (userInput) => {
    console.log(userInput);
    
    const { name, value } = userInput;
     console.log(name,value);
 

    if (name === "firstName") {
      setFirstName(value);
      setInvalidName(!/^[a-zA-Z]*$/.test(value));
    } else if (name === "secondName") {
      setSecondName(value);
      setInvalidName(!/^[a-zA-Z]*$/.test(value));
    } else if (name === "mobileNumber") {
      setMobileNumber(value);
      setInvalidMobileNumber(!/^[0-9]{10}$/.test(value));
    } else if (name === "email") {
      setEmail(value);
      setInvalidEmail(!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value));
    } else if (name === "dateOfBirth") {
      setDateOfBirth(value);
      const currentDate = new Date();
      setInvalidDob(!value || value.toDate() >= currentDate);
    } else if (name === "course") {
      setCourse(value);
      setInvalidCourse(!value);
    } else if (name === "gender") {
      setGender(value);
      setInvalidGender(!value);
    } else if (name === "address") {
      setUserAddress(value);
      setInvalidAddress(value.trim().length <5 );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Check all validations explicitly
    const isNameValid = /^[a-zA-Z\s]+$/.test(firstName) && /^[a-zA-Z\s]+$/.test(secondName);
    const isEmailValid = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isMobileValid = /^[0-9]{10}$/.test(mobileNumber);
    const isDobValid = dateOfBirth && dayjs(dateOfBirth).isValid() && dayjs(dateOfBirth).isBefore(dayjs());
    const isGenderValid = gender.trim() !== "";
    const isCourseValid = course.trim() !== "";
    const isAddressValid = userAddress.trim().length >= 5;
  
    // Update invalid states
    setInvalidName(!isNameValid);
    setInvalidEmail(!isEmailValid);
    setInvalidMobileNumber(!isMobileValid);
    setInvalidDob(!isDobValid);
    setInvalidGender(!isGenderValid);
    setInvalidCourse(!isCourseValid);
    setInvalidAddress(!isAddressValid);
  
    if (isNameValid && isEmailValid && isMobileValid && isDobValid && isGenderValid && isCourseValid && isAddressValid) {
      // If all validations pass, log the data and show success
      console.log({
        name: firstName,
        secondName,
        email,
        mobileNumber,
        dateOfBirth: dayjs(dateOfBirth).format("DD-MM-YYYY"),
        gender,
        course,
        address: userAddress,
      });
      alert("Form submitted successfully!");
      clearForm();
    } else {
      alert("Please fill out the form correctly.");
    }
  };

  const  clearForm =()=>{
    setFirstName("")
    setSecondName("")
    setCourse("")
    setDateOfBirth(null)
    setEmail("")
    setGender("")
    setMobileNumber("")
    setUserAddress("");
    
  }

  

  return (
    <>
      <div
        style={{ height: "100vh", width: "100%",backgroundColor:"#8FB69B" }} 
        className="d-flex justify-content-center flex-column align-items-center  p-3"
      >
        <h2 className="fw-bolder mb-2 text-uppercase text-dark"> students registration form</h2>
        <form style={{backgroundColor:"#F5FFFA"}} className="t p-3 rounded-2 "   >
          {/* Name */}
          <div className="mb-2 d-flex w-100">
            <TextField
              name="firstName"
              value={firstName || ""}
              onChange={(e) => validateForm(e.target)}
              style={{ width: "49%" }}
              className="me-2 mb-1"
              id="First Name"
              label="First Name"
              variant="outlined"
            />
            <TextField
              name="secondName"
              value={secondName || ""}
              onChange={(e) => validateForm(e.target)}
              style={{ width: "49%" }}
              id="Last Name"
              label="Last Name"
              variant="outlined"
            />
          </div>
          {/* invalid name */}
          {invalidName && (
            <div style={{ fontSize: "0.8rem" }} className="mb-3 text-danger">
              Invalid Name Format
            </div>
          )}

          {/* Email */}
          <div className="mb-2">
            <TextField
              value={email || ""}
              name="email"
              onChange={(e) => validateForm(e.target)}
              className="w-100"
              id="Email"
              label="Email"
              variant="outlined"
            />

            {/* invalid email */}
            {invalidEmail && (
              <div style={{ fontSize: "0.8rem" }} className="mb-3 text-danger">
                Invalid Email
              </div>
            )}
          </div>

          {/* Mobile Number */}
          <div className="mb-2">
            <TextField
              value={mobileNumber || ""}
              onChange={(e) => validateForm(e.target)}
              name="mobileNumber"
              className="w-100"
              id="Mobile Number"
              label="Mobile Number"
              variant="outlined"
            />
            {/* invalid number */}
            {invalidMobileNumber && (
              <div style={{ fontSize: "0.8rem" }} className="text-danger mb-3">
                Invalid Mobile Number
              </div>
            )}
          </div>

          {/* Date of Birth and Gender */}
          <div className="mb-2 row d-flex">
            <div className=" mb-1 col-lg-5 d-flex flex-column">
              <LocalizationProvider className="mb-1" dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="date of birth"
                  className="w-100"
                  label="Date of Birth"
                  value={dateOfBirth || null}
                  onChange={(newValue) => {
                    setDateOfBirth(newValue);
                    validateForm({ name: "Date of Birth", value: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} className="mb-3" />
                  )}
                />
                {/* invalid date od biret */}
              </LocalizationProvider>
              {invalidDob && (
                <div style={{ fontSize: "0.8rem" }} className="text-danger">
                  Invalid Date of Birth
                </div>
              )}
            </div>
            <div className="col-lg-7">
              {/* gender section */}
              <FormControl className="ms-2 ">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  
                  onChange={(e) => validateForm(e.target)}
                  value={gender ||""}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="others"
                    control={<Radio />}
                    label="Others"
                  />
                </RadioGroup>
              </FormControl>
            {/* invalid Gender */}
            {invalidGender && (
              <div style={{ fontSize: "0.8rem" }} className="text-danger">
                Please enter a gender
              </div>
            )}
            </div>
          </div>

          {/* Courses */}
          <div className="mb-2">
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Select Course
              </InputLabel>
              <Select
                name="course"
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={(e) => validateForm(e.target)}
                value={course || ""}
                autoWidth
                label="Select Course"
              >
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Commerce">Commerce</MenuItem>
                <MenuItem value="Biology">Biology</MenuItem>
                <MenuItem value="Humanities">Humanities</MenuItem>
              </Select>
            </FormControl>
            {/* invsalid course */}
            {invalidCourse && (
              <div style={{ fontSize: "0.8rem" }} className="text-danger">
                Please enter select course is required.
              </div>
            )}
          </div>
          <div className="mb-2">
            {/* Address */}
            <TextField
              name="address"
              value={userAddress || ""}
              onChange={(e) => validateForm(e.target)}
              className="w-100"
              id="Address"
              label="Address"
              variant="outlined"
              multiline
              rows={4}
            />
            {/* invsalid Address */}
            {invalidAddress && (
              <div style={{ fontSize: "0.8rem" }} className="text-danger">
                Please enter a valid address.
              </div>
            )}
          </div>

          {/* Buttons */}
          <div>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                onClick={handleFormSubmit}
                style={{ width: "50%", height: "45px", backgroundColor:"#235347",color:"#8EB69B" }}
                variant="contained"
              >
                SUBMIT
              </Button>
              <Button
                type="button"
                onClick={() => window.location.reload()} // Clear form
                style={{ width: "50%", height: "45px" ,border:"1px", borderStyle:"solid",borderColor:"#163832" ,color:"#163832" }}
                
                variant="outlined"
              >
                CLEAR
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
}
export default App;

