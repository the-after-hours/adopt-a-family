const Wishlist = require('../models/wishlist');

const _getWishlistCost = list => {
  // Accept list as Array of objects
  // Should return a single cost for the entire wishlist
  let totalCost = 0;

  list.forEach(item => {
    totalCost += item.itemCost * item.itemQuantity;
  });

  return totalCost;
};

exports.addItem = (req, res) => {
  // Bad request if no body is sent
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      Error: 'Body missing data',
    });
  }

  const familyId = req.params.familyId;
  const item = req.body.item;

  // TODO: Check structure of item
  // Prevent duplicate items

  try {
    Wishlist.find({ family: familyId }).exec((err, wishlist) => {
      if (err) {
        res.status(500).json({ Error: err });
      }

      wishlist[0].list.push(item);

      wishlist[0].totalListCost = _getWishlistCost(wishlist[0].list);

      wishlist[0].save((err, wishlist) => {
        if (err) {
          res.status(500).json({ Error: err });
        }

        res.status(201).json({
          message: 'Successfully added item to wishlist',
          wishlist: wishlist,
        });
      });

      // Need to write to wishlist total cost.
      console.log(_getWishlistCost(wishlist[0].list));
    });
  } catch (err) {
    res.status(500).json({ Message: 'TEMP ERROR TEST' });
  }
};

exports.create = (req, res) => {
  res.send('NOT YET IMPLEMENTED');
};

exports.delete = (req, res) => {
  res.send('NOT YET IMPLEMENTED');
};

exports.removeItem = (req, res) => {
  // Bad request if no body is sent
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      Error: 'Body missing data',
    });
  }

  const familyId = req.params.familyId;
  const { itemName } = req.body.item;
  const itemId = req.body.itemId;

  try {
    Wishlist.where({ family: familyId })
      .findOne({
        'list.itemName': itemName,
        'list._id': itemId,
      })
      .exec((err, wishlist) => {
        if (err) {
          res.status(500).json({ Error: err });
        }

        if (!wishlist) {
          return res
            .status(400)
            .send('No wishlist found containing that itemId');
        }

        wishlist.list = wishlist.list.filter(
          item => item._id.toString() !== itemId
        );

        wishlist.totalListCost = _getWishlistCost(wishlist.list);

        wishlist.save((err, wishlist) => {
          if (err) {
            res.status(500).json({ Error: err });
          }

          res.status(200).json({
            message: 'Successfully removed item from wishlist',
            wishlist: wishlist,
          });
        });
      });
  } catch (err) {
    res.status(500).json({ Message: 'TEMP ERROR TEST' });
  }
};

exports.updateItem = (req, res) => {
  // Bad request if no body is sent
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      Error: 'Body missing data',
    });
  }

  const familyId = req.params.familyId;
  const { itemName, itemCost, itemQuantity } = req.body.item;
  const itemId = req.body.itemId;


  try {
    Wishlist.where({ family: familyId })
      .findOne({
        'list.itemName': itemName,
        'list._id': itemId,
      })
      .exec((err, wishlist) => {
        if (err) {
          res.status(500).json({ Error: err });
        }

        wishlist.list.map(item => {
          if (item._id.toString() === itemId) {
            console.log('found match');

            item.itemName = itemName;
            item.itemPrice = itemPrice;
            item.itemQuantity = itemQuantity;
          }
        });

        console.log(wishlist);
      });
  } catch (err) {
    res.status(500).json({ Message: 'TEMP ERROR TEST' });
  }
  res.send('NOT YET IMPLEMENTED');
};
