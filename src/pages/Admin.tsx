import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BreathingList } from '@/components/admin/breathing/BreathingList';
import { BreathingForm } from '@/components/admin/breathing/BreathingForm';
import { MeditationList } from '@/components/admin/meditation/MeditationList';
import { MeditationForm } from '@/components/admin/meditation/MeditationForm';

export default function Admin() {
  return (
    <AdminGuard>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="breathing" replace />} />
          <Route path="breathing" element={<BreathingList />} />
          <Route path="breathing/:id" element={<BreathingForm />} />
          <Route path="meditation" element={<MeditationList />} />
          <Route path="meditation/:id" element={<MeditationForm />} />
        </Route>
      </Routes>
    </AdminGuard>
  );
}
