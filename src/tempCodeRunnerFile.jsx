<DatePicker
    name="dob"
    label="Date of Birth"
    value={dateOfBirth}
    onChange={(newValue) => {
      setDateOfBirth(newValue);
      validateForm({ name: "dob", value: newValue });
    }}
    renderInput={(params) => (
      <TextField {...params} className="mb-3" />
    )}
  />
</LocalizationProvider>