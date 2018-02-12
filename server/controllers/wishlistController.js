const Wishlist = require('../models/wishlist');

exports.addItem = (req, res) => {
  const familyId = req.params.familyId;
  const item = req.body.item;

  // Bad request if no body is sent
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      Error: 'Body missing data',
    });
  }

  // TODO: Check structure of item
  // Prevent duplicate items

  Wishlist.find({ family: familyId }).exec((err, wishlist) => {
    if (err) {
      res.status(500).json({ Error: err });
    }

    wishlist[0].list.push(item);

    wishlist[0].save((err, wishlist) => {
      if (err) {
        res.status(500).json({ Error: err });
      }

      res.status(201).json({
        message: 'Successfully added item to wishlist',
        wishlist: wishlist,
      });
    });
  });
};

exports.create = (req, res) => {
  res.send('NOT YET IMPLEMENTED');
};

exports.delete = (req, res) => {
  res.send('NOT YET IMPLEMENTED');
};

exports.removeItem = (req, res) => {
  const familyId = req.params.familyId;
  const { itemName, itemQuantity } = req.body.item;
  const itemId = req.body.itemId;

  // Bad request if no body is sent
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      Error: 'Body missing data',
    });
  }

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
        res.status(200).send('Wishlist not found.');
      }
      // Verify item exists
      // Verify item quantity gte body item qty

      const list = wishlist.list;
      const newList = list.filter(item => item._id.toString() !== itemId);

      // // BREAK
      // return res.send(list);

      wishlist.list = newList;
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
};

exports.updateItem = (req, res) => {
  // list.forEach(item => {
  //   if (item._id.toString() === itemId) {
  //     if (item.quantity >= itemQuantity) {
  //       item.quantity -= itemQuantity;

  //     }
  //   }
  // });

  res.send('NOT YET IMPLEMENTED');
};
