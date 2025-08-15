import { useEffect, useState } from "react";
import { Dropdown } from "../General/Dropdown";
import { Brain, Building2, Mic} from "lucide-react";
import {
  companies,
  difficultyLevels,
  durationOptions,
  experienceLevels,
  focusAreas,
  programmingLanguages,
  roles,
  skills,
} from "../../constants";
const mockCategories = [
  {
    id: 1,
    value: "comapanyspecific",
    label: "Company Specific",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    id: 2,
    value: "skillbased",
    label: "Skill Based",
    icon: <Brain className="h-4 w-4" />,
  },
];

export const MockInterviewForm = () => {
  const [mockState, setMockState] = useState(null);
  const [selectCompany, setSelectCompany] = useState(null);
  const [selectRole, setSelectRole] = useState(null);
  const [selectFocusArea, setSelectFocusArea] = useState(null);
  const [selectExperienceLevel, setSelectExperienceLevel] = useState(null);
  const [selectProgrammingLanguage, setSelectProgrammingLanguage] =
    useState(null);
  const [selectDifficultyLevel, setSelectDifficultyLevel] = useState(null);
  const [selectDuration, setSelectDuration] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [intructions,setIntructions]=useState("");

  const handleOnClick = (e) => {
    e.preventDefault();
    const formData = {
      mockState,
      selectCompany,
      selectRole,
      selectDifficultyLevel,
      selectExperienceLevel,
      selectFocusArea,
      selectedSkills,
      selectProgrammingLanguage,
      selectDuration,
      intructions
    };

    console.log("Form Data :: ", formData);
  };

  useEffect(() => {
    setSelectCompany(null);
    setSelectRole(null);
    setSelectedSkills([]);
    setSelectProgrammingLanguage(null);
    setSelectDifficultyLevel(null);
    setSelectDuration(null);
    setSelectExperienceLevel(null);
    setSelectFocusArea(null);
  }, [mockState]);
  return (
    <div className="!space-y-6">
      <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200 !space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 !mb-6">
          Start New Mock Practice Session
        </h3>
        <div className="flex">
          <Dropdown
            label="Mock Category"
            options={mockCategories}
            value={mockState}
            onChange={setMockState}
            placeholder="select mock interview type"
            required
            // error="Please select at least one team"
            size="sm"
          />
        </div>
        <div className="grid md:grid-cols-2 !gap-6">
          {mockState?.id !== 2 ? (
            <>
              <Dropdown
                label="Choose Company"
                options={companies}
                value={selectCompany}
                onChange={setSelectCompany}
                placeholder="choose company"
                required
                searchable
                // error="Please select at least one team"
                size="md"
              />
              <Dropdown
                label="Select Role"
                options={roles}
                value={selectRole}
                onChange={setSelectRole}
                placeholder="select role"
                required
                // error="Please select at least one team"
                size="md"
              />
              <Dropdown
                label="Experience Level"
                options={experienceLevels}
                value={selectExperienceLevel}
                onChange={setSelectExperienceLevel}
                placeholder="select experience level"
                required
                // error="Please select at least one team"
                size="md"
              />
              <Dropdown
                label="Preferred Programming Language"
                options={programmingLanguages}
                value={selectProgrammingLanguage}
                onChange={setSelectProgrammingLanguage}
                placeholder="select programming language"
                required
                // error="Please select at least one team"
                size="md"
              />
            </>
          ) : (
            <>
              <Dropdown
                label="Select Skills"
                options={skills}
                value={selectedSkills}
                onChange={setSelectedSkills}
                placeholder="select skills..."
                multiple
                searchable
                clearable
                required
                helperText="You can select multiple skills"
                variant="filled"
              />
              <Dropdown
                label="Difficulty Level"
                options={difficultyLevels}
                value={selectDifficultyLevel}
                onChange={setSelectDifficultyLevel}
                placeholder="select difficulty level"
                required
                // error="Please select at least one team"
                size="md"
              />
              <Dropdown
                label="Duration"
                options={durationOptions}
                value={selectDuration}
                onChange={setSelectDuration}
                placeholder="select duration"
                required
                // error="Please select at least one team"
                size="md"
              />
              <div className="flex flex-col row-span-2">
                <label
                  htmlFor="user-intructions"
                  className="font-medium text-sm text-gray-700 !mb-1.5"
                >
                  Special Intructions
                </label>
                <textarea
                  id="user-intructions"
                  value={intructions}
                  onChange={(e)=>setIntructions(e.target.value)}
                  placeholder="enter your instructions..."
                  className="h-full text-sm !p-3 border text-gray-600 border-gray-400 rounded-xl"
                />
              </div>
            </>
          )}
          <Dropdown
            label="Focus Area"
            options={focusAreas}
            value={selectFocusArea}
            onChange={setSelectFocusArea}
            placeholder="select focus area"
            required
            multiple
            searchable
            helperText={"You can choose multiple focus area"}
            // error="Please select at least one team"
            size="md"
          />
        </div>

        <div className="!mt-6 flex justify-center">
          <button
            className="flex items-center !space-x-3 !px-8 !py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
            onClick={(e) => handleOnClick(e)}
          >
            {<Mic className="w-5 h-5" />}
            <span className="font-medium">{"Start Mock Interview"}</span>
          </button>
        </div>
      </div>
      <div className="w-full h-24"></div>
    </div>
  );
};
