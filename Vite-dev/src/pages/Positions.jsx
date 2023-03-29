import { useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { Grid, _ } from "gridjs-react";
import { PositionForm } from "./PositionForm";


async function fetchPositions() {
  const positions = await axios.get("http://flip3.engr.oregonstate.edu:1819/positions");
  return positions.data.rows;
}

export default function Positions() {
  const [positions, setPositions] = useState(
    async () => await fetchPositions()
  );

  function fetchAndSetPositions() {
    setPositions(async () => await fetchPositions());
  }

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);

  async function handleDelete(row) {
    if (
      window.confirm(
        `Are you sure you want to DELETE the record for position ID = ${row.position_id}?`
      ) === true
    ) {
      let deleted = await axios.delete(
        `http://flip3.engr.oregonstate.edu:1819/positions/${row.position_id}`
      );
      if (deleted.status === 200) {
        fetchAndSetPositions();
      }
    }
  }

  function handleEdit(row) {
    setFormData(row);
    setShowForm(true);
  }

  return (
    <div>
      <h3>Positions</h3>
      <Link to="/positionsnew">
                <button className='green-btn' type="button">
                    Add new Position
                </button>
            </Link>
            <br />
            <br />
            {showForm ? (
                <PositionForm
                    row={formData}
                    showForm={setShowForm}
                    // rerender the page when changes are made
                    parentRerender={() => fetchAndSetPositions()}
                ></PositionForm>
            ) : null}
      <Grid
        columns={[
          { name: "Position ID", id: "position_id", sort: true, width: "8%" },
          { name: "Position Title", id: "position_title", sort: true },
          { name: "Shift", id: "shift", sort: true },
          { name: "Department", id: "department", sort: true },
          {
            name: "Edit Item",
            data: (row) => _(<MdEdit onClick={() => handleEdit(row)} />),
            width: "6%",
          },
          {
            name: "Delete Item",
            data: (row) => _(<MdDeleteForever onClick={() => handleDelete(row)} />),
            width: "6%",
          },
        ]}
        data={async () => await positions}
        search={true}
        pagination={{ limit: 25 }}
      />


    </div>
  );
}