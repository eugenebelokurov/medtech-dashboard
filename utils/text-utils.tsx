export function highlightMedicalTerms(text: string) {
  // List of important medical terms to highlight
  const terms = [
  "diagnosis",
  "oncologist",
  "endocrinologist",
  "therapist (general practitioner)",
  "infiltrative",
  "carcinomatosis",
  "chemotherapy",
  "diabetes mellitus",
  "NCD (neurocirculatory dystonia)",
  "hypertensive",
  "tuberculosis",
  "viral diseases",
  "blood transfusions",
  "malignant neoplasm (MN)",
]


  let highlightedText = text

  // Replace each term with a highlighted version
  terms.forEach((term) => {
    const regex = new RegExp(term, "gi")
    highlightedText = highlightedText.replace(
      regex,
      (match) => `<span class="bg-yellow-100 font-medium">${match}</span>`,
    )
  })

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: highlightedText }} 
    />
  );
}

export function highlightSearchTerms(text: string, searchTerm: string) {
  if (!searchTerm || searchTerm.trim() === "") {
    return text
  }

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const highlightedText = text.replace(regex, '<span class="bg-yellow-200 font-medium">$1</span>')

  return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
}
