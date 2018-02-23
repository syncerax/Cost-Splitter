var spent = {};
var paid = {};
var total_amount_spent = 0;
var total_amount_paid = 0;
var first_person = 0;

function validate()
{
	if (document.getElementById('name').value == "")
		return false;
	console.log(1);
	if (isNaN(document.getElementById('paid').value))
		return false;
	console.log(2);
	if (document.getElementById('unequal_split').checked && isNaN(document.getElementById('spent').value))
		return false;
	return true;
}

function add_person()
{
	console.log(validate());
	first_person += 1;
	var table=document.getElementsByTagName('table')[0];
	var new_row=table.insertRow(1);
	var cell1=new_row.insertCell(0);
	var cell2=new_row.insertCell(1);
	var cell3=new_row.insertCell(2);
	cell1.innerHTML=document.getElementById('name').value;
	cell2.innerHTML=document.getElementById('paid').value;
	if (document.getElementById('unequal_split').checked)
		cell3.innerHTML=document.getElementById('spent').value;
	else
		cell3.innerHTML="--";
	if (document.getElementById('unequal_split').checked)
	{
		spent[document.getElementById('name').value] = parseInt(document.getElementById('spent').value);
		total_amount_spent += parseInt(document.getElementById('spent').value);
		console.log(spent);
	}
	else
	{
		document.getElementById('spent').style.display="none";
		document.getElementById('spentL').style.display="none";
	}
	paid[document.getElementById('name').value] = parseInt(document.getElementById('paid').value);
	total_amount_paid += parseInt(document.getElementById('paid').value);
	console.log(paid);

	if(first_person == 1)
		document.getElementById('split_check').style.display="none";
}

function split()
{
	document.getElementById('disp_toggle').style.display="block";
	if (!document.getElementById('unequal_split').checked)
		for (var i in paid)
			spent[i] = total_amount_paid / Object.keys(paid).length;

	for (var i in paid)
	{
		if (paid[i] >= spent[i])
			continue;
		var balance = spent[i] - paid[i];
		for (var j in paid)
		{
			if (balance <= 0)
				break;
			else if (i == j)
				continue;
			if (paid[j] > spent[j])
			{
				var excg = Math.min(balance, paid[j] - spent[j]);
				balance -= excg;
				paid[i] -= excg;
				paid[j] -= excg;
				var LInode = document.createElement("li");
				LInode.className = "list-group-item";
				var txtNode=document.createTextNode(i + " has to pay " + j + " Rs. " + Math.round(excg));
				LInode.appendChild(txtNode);
				document.getElementById("myList").appendChild(LInode);
				console.log(i + " has to pay " + j + " Rs. " + Math.round(excg));
			}
		}
	}
}