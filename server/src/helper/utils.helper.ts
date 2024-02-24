import { EntityManager, getManager } from 'typeorm';

export async function dbTransactionWrap(operation: (...args) => any, manager?: EntityManager): Promise<any> {
  if (manager) {
    return await operation(manager);
  } else {
    return await getManager().transaction(async (manager) => {
      return await operation(manager);
    });
  }
}

export const updateTimestampForAppVersion = async (manager, appVersionId) => {
  const appVersion = await manager.findOne('app_versions', appVersionId);
  if (appVersion) {
    await manager.update('app_versions', appVersionId, { updatedAt: new Date() });
  }
};

export async function dbTransactionForAppVersionAssociationsUpdate(
  operation: (...args) => any,
  appVersionId: string
): Promise<any> {
  return await getManager().transaction(async (manager) => {
    const result = await operation(manager);

    await updateTimestampForAppVersion(manager, appVersionId);

    return result;
  });
}
