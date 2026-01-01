export function buildTree(assets, tree) {
  return {
    name: "All Assets",
    children: assets.map(asset => ({
      ...asset,
      name: asset.name,
      children: tree[asset.id] || []
    }))
  };
}
