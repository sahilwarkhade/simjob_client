import { Building2, PlayIcon} from "lucide-react";
import { useEffect, useState } from "react";
import { Dropdown } from "../General/Dropdown";
import {
  companies,
  difficultyLevels,
  durationOptions,
  experienceLevels,
  roles,
  testSections,
} from "../../constants";
import { PiExam } from "react-icons/pi";
const oaType = [
  {
    id: 1,
    value: "comapanyspecific",
    label: "Company Specific",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    id: 2,
    value: "practice",
    label: "Practice",
    icon: <PlayIcon className="h-4 w-4" />,
  },
];

export const OaTest = () => {
  const [selectOAType, setSelectOAType] = useState(null);
  const [selectCompany, setSelectCompany] = useState(null);
  const [selectRole, setSelectRole] = useState(null);
  const [selectExperienceLevel, setSelectExperienceLevel] = useState(null);
  const [selectDifficultyLevel, setSelectDifficultyLevel] = useState(null);
  const [selectDuration, setSelectDuration] = useState(null);
  const [intructions,setIntructions]=useState("")
  const [selectComapanies, setSelectCompanies] = useState([]);
  const [selectTestSections, setSelectTestSections] = useState([]);

  const handleOnClick = (e) => {
    e.preventDefault();

    const formData = {
      selectOAType,
      selectCompany,
      selectComapanies,
      selectDifficultyLevel,
      selectDuration,
      selectExperienceLevel,
      selectRole,
      selectTestSections,
      intructions
    };

    console.log("Form Data :: ", formData);
  };

  useEffect(() => {
    setSelectCompanies([]);
    setSelectCompany(null);
    setSelectDifficultyLevel(null);
    setSelectDuration(null);
    setSelectExperienceLevel(null);
    setSelectRole(null);
    setSelectTestSections([]);
    setIntructions("")
  }, [selectOAType]);

  return (
    <div className="!space-y-6">
      {/* Session Setup */}
      <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200 !space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 !mb-6">
          Start New OA Practice Session
        </h3>
        <div className="flex">
          <Dropdown
            label="OA Category"
            options={oaType}
            value={selectOAType}
            onChange={setSelectOAType}
            placeholder="select type of online assessment"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 !gap-6">
          {selectOAType?.id !== 2 ? (
            <>
              <Dropdown
                label="Choose Company"
                options={companies}
                value={selectCompany}
                onChange={setSelectCompany}
                placeholder="choose company"
                searchable
                required
                variant="filled"
              />
              <Dropdown
                label="Select Role"
                options={roles}
                value={selectRole}
                onChange={setSelectRole}
                placeholder="select role"
                required
              />
              <Dropdown
                label="Experience Level"
                options={experienceLevels}
                value={selectExperienceLevel}
                onChange={setSelectExperienceLevel}
                placeholder="select experience level"
                required
              />
            </>
          ) : (
            <>
              <Dropdown
                label="Targeted Companies"
                options={companies}
                value={selectComapanies}
                onChange={setSelectCompanies}
                placeholder="select targeted companies..."
                multiple
                searchable
                clearable
                required
                helperText="You can select multiple companies (atleast one)"
                variant="filled"
              />
              <Dropdown
                label="Difficulty Level"
                options={difficultyLevels}
                value={selectDifficultyLevel}
                onChange={setSelectDifficultyLevel}
                placeholder="select difficulty level"
                required
              />
              <Dropdown
                label="Duration"
                options={durationOptions}
                value={selectDuration}
                onChange={setSelectDuration}
                placeholder="select duration"
                required
              />
            </>
          )}
          <Dropdown
            label="Select Test Sections"
            options={testSections}
            value={selectTestSections}
            onChange={setSelectTestSections}
            placeholder="select sections"
            multiple
            clearable
            helperText={"You can select multiple sections"}
          />
          <div className="flex flex-col row-span-2 md:col-span-2">
            <label
              htmlFor="user-intructions"
              className="font-medium text-sm text-gray-700 !mb-1.5"
            >
              Special Intructions
            </label>
            <textarea
              id="user-intructions"
              placeholder="enter your instructions..."
              value={intructions}
              onChange={(e)=>setIntructions(e.target.value)}
              className="h-full text-sm !p-3 border text-gray-600 border-gray-400 rounded-xl"
            />
          </div>
        </div>

        <div className="!mt-6 flex justify-center">
          <button className="flex items-center !space-x-3 !px-8 !py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer" onClick={(e)=>handleOnClick(e)}>
            {<PiExam className="w-5 h-5" />}
            <span className="font-medium">{"Start Online Assessment"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
