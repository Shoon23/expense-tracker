export default function buildWhereClause(options: any) {
  const {
    userId,
    id,
    expenseId,
    budgetId,
    categoryId,
    searchKey,
    categoryFilter,
    budgetFilter,
    dateFilter,
  } = options;

  const where: any = {
    isDelete: false,
  };

  if (userId) {
    where.userId = Number(userId);
  } else if (id) {
    where.id = Number(id);
  } else if (expenseId) {
    where.expenseId = Number(expenseId);
  } else if (budgetId) {
    where.expenseId = Number(budgetId);
  } else if (categoryId) {
    where.categoryId = Number(categoryId);
  }

  if (searchKey) {
    where.OR = [
      { name: { contains: searchKey } },
      { amount: { contains: searchKey } },
    ];
  }

  if (categoryFilter) {
    where.categoryId = Number(categoryFilter);
  }

  if (budgetFilter) {
    where.budgetId = Number(budgetFilter);
  }

  if (dateFilter) {
    where.id = Number(dateFilter);
  }

  return where;
}
