
/**
* TODO Calculate the Budget
* BODY Move the budget logic to a controller
*/
export.calculateBudget = (req, res) => {
  if (
    typeof req.query.budget === 'undefined' ||
    req.query.budget === 'null' ||
    req.query.budget === 'undefined'
  ) {
    res.status(400).json({ message: 'Missing Budget Param' });
  } else {
    let budget = parseInt(req.query.budget);
    // An Orginization/Organizer calls this by passing FAMILY (wildcard invalid) and Budget
    // it returns a list of donors with matching Family.wishlist.cost === Donor.budget +/- 10% [max $20, future implement] (from here on called 'budget')
    // list is ordered in ascending order
    // e.g. Family.wishlist.cost = 100 +/- 10%
    // sorted list: 90, 95, 98, 99, 101, 102, 110
    let maxBudget = budget * 1.1;
    let minBudget = budget * 0.9;

    Donor.where('budget')
      .gte(minBudget)
      .lte(maxBudget)
      .where('matchedFamily', null)
      // .populate('name') // Populate function is not working right now.. need to figure it out
      .sort({ budget: 1 }) // Take the donors found and sort budgets from lowest to highest
      .exec((err, donors) => {
        if (err) {
          console.error(err);
          // Handle this better later
          res.status(500).json({ message: err });
        } else {
          // Take the donors and provide appropriate message if no donors were found
          if (donors.length === 0) {
            res.status(200).json({
              message: 'No donors were found',
              donors: donors,
            });
          } else {
            res.status(200).json({
              message: 'Donors were found',
              donors: donors,
            });
          }
        }
      });
  }
};