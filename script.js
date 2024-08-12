const MoneyFormat = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD"
})

function UpdateTotal()
{
	const Total = document.querySelector("#total")

	if (!Total)
	{
		console.error("Can't find total")
		return
	}

	var TotalValue = 0
	const Inputs = document.querySelectorAll("input")

	Inputs.forEach((Input) =>
	{
		TotalValue += parseFloat(Input.value) * Input.m_flWorth
	})

	Total.innerHTML = MoneyFormat.format(TotalValue)
}

function AddCounter(Label, Worth)
{
	const Display = document.querySelector("#display")

	if (!Display)
	{
		console.error("Can't find display")
		return
	}

	const Container = document.createElement("tr")
	const LabelContainer = document.createElement("td")
	const InputContainer = document.createElement("td")
	const ResetContainer = document.createElement("td")

	const Input = document.createElement("input")
	Input.setAttribute("type", "number")
	Input.setAttribute("min", 0)
	Input.setAttribute("max", 1000)
	Input.value = 0
	Input.m_flWorth = Worth
	Input.id = Label.toLowerCase()

	Input.onchange = (Event) =>
	{
		const Input = Event.target
		if (!Input) return

		UpdateTotal()
	}

	const LabelElement = document.createElement("label")
	LabelElement.setAttribute("for", Input.id)
	LabelElement.innerHTML = Label

	const Reset = document.createElement("button")
	Reset.classList.add("reset")
	Reset.innerHTML = "Reset"
	Reset.m_Input = Input

	Reset.onclick = (Event) =>
	{
		const Reset = Event.target
		if (!Reset) return

		const Input = Reset.m_Input
		if (!Input) return

		Input.value = 0
		UpdateTotal()
	}

	LabelContainer.appendChild(LabelElement)
	InputContainer.appendChild(Input)
	ResetContainer.appendChild(Reset)

	Container.appendChild(LabelContainer)
	Container.appendChild(InputContainer)
	Container.appendChild(ResetContainer)

	Display.appendChild(Container)
}

window.addEventListener("load", () =>
{
	AddCounter("Pennies", 0.01)
	AddCounter("Nickels", 0.05)
	AddCounter("Dimes", 0.10)
	AddCounter("Quarters", 0.25)
	AddCounter("Ones", 1)
	AddCounter("Twos", 2)
	AddCounter("Fives", 5)
	AddCounter("Tens", 10)
	AddCounter("Twenties", 20)
	AddCounter("Fifties", 50)
	AddCounter("Hundreds", 100)

	const ResetAll = document.querySelector("#reset")

	if (ResetAll)
	{
		ResetAll.onclick = () =>
		{
			const Resets = document.querySelectorAll(".reset")

			Resets.forEach((Reset) =>
			{
				Reset.onclick({ target: Reset })
			})
		}
	}
})
