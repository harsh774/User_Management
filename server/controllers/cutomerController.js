/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  //Home
  const locals = {
    title: 'NodeJs',
    description: 'NodeJs User Management System by harsh',
  };

  res.render('index', locals);
};

/**
 * GET
 * New Customer Form
 */

exports.addCustomer = async (req, res) => {
  //Home
  const locals = {
    title: 'Add New Customer - NodeJS',
    description: 'NodeJs User Management System by harsh',
  };

  res.render('customer/add', locals);
};
