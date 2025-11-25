# Cesta k JSON souboru
$jsonPath = "C:\Users\jirka\Desktop\labels.json"

# Load JSON
$labels = Get-Content $jsonPath | ConvertFrom-Json

# Delete existing labels
$existingLabels = gh api repos/JirkaUlbricht/czechified.h/labels --paginate | ConvertFrom-Json
foreach ($label in $existingLabels) {
    gh api repos/JirkaUlbricht/czechified.h/labels/$($label.name) --method DELETE
    Write-Host "Deleted label:" $label.name
}

# Create labels from JSOM
foreach ($label in $labels) {
    gh api repos/JirkaUlbricht/czechified.h/labels --method POST `
        -f name=$($label.name) `
        -f color=$($label.color) `
        -f description=$($label.description)
    Write-Host "Created label:" $label.name
}
